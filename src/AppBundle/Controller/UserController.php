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
     *  section="User",
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
}