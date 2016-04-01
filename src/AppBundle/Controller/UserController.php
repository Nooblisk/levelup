<?php
/**
 * User: davydov
 * Date: 10.02.2016
 * Time: 18:25
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Feature;
use AppBundle\Entity\User;
use AppBundle\Form\FeatureType;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Returns current user data
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Users",
     *  resource=true,
     *  description="Returns current user data",
     *  statusCodes = {
     *    200 = "Returned when successful",
     *    401 = "Returned on authorization failure"
     *  }
     * )
     *
     * @return array
     */
    public function getAction()
    {
        return ['user' => $this->getUser()];
    }

    /**
     * Post a new user
     *
     * @param Request $request
     * @ApiDoc(
     *  section="Users",
     *  description="Creates new user",
     *  input={"class"="FOS\UserBundle\Form\Type\RegistrationFormType", "name"="fos_user_registration_form"},
     *  output="AppBundle\Entity\User",
     *  statusCodes = {
     *    200 = "Returned when successful",
     *    400 = "Returned when the form contains an error"
     *  }
     * )
     *
     * @return array
     */
    public function postAction(Request $request)
    {
        /** @var $formFactory \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->createUser();
        $user->setEnabled(true);

        $form = $formFactory->createForm();
        $form->setData($user);

        $form->handleRequest($request);

        if ($form->isValid()) {
            $userManager->updateUser($user);

            return ['user' => $user];
        }

        return ['form' => $form];
    }

    /**
     * @param string  $token
     * @ApiDoc(
     *  section="Users",
     *  description="Confirms user creation using token",
     *  statusCodes = {
     *    204 = "Returned when successful",
     *    404 = "Returned when token is not found"
     *  }
     * )
     *
     * @View(statusCode=204)
     * @return null
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function confirmAction($token)
    {
        /** @var $userManager \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->findUserByConfirmationToken($token);

        if (null === $user) {
            throw new NotFoundHttpException(sprintf('The user with confirmation token "%s" does not exist', $token));
        }

        $user->setConfirmationToken(null);
        $user->setEnabled(true);

        $userManager->updateUser($user);
        return null;
    }
}