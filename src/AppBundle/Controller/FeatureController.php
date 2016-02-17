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
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;

class FeatureController extends FOSRestController implements ClassResourceInterface
{
    /**
     * Returns a feature by its id created by current user
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  resource=true,
     *  description="Returns current user's feature"
     * )
     * @param integer $featureId Id of current user's feature
     *
     * @return array
     */
    public function getAction($featureId)
    {
        $user = $this->getUser();
        $feature = $this->getFeatureRepository()->findOneBy(['user'=>$user, 'id' => $featureId]);
        return ['feature' => $feature];
    }

    /**
     * Get all features
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  resource=true,
     *  description="Returns current user's features"
     * )
     * @return array
     */
    public function cgetAction()
    {
        return ['features' => $this->getFeatureRepository()->findByUser($this->getUser())];
    }


    /**
     * Post a new feature
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @param Request $request
     * @ApiDoc(
     *  description="Creates new feature"
     * )
     *
     * @return array
     */
    public function postAction(Request $request)
    {
        $form = $this->createForm(FeatureType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $feature = $form->getData();
            $feature->setUser($this->getUser());
            $em = $this->getDoctrine()->getManager();
            $em->persist($feature);
            $em->flush();
            return ['feature' => $feature];
        }

        return ['form' => $form];
    }

    /**
     * Request fields for a new form
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>

     * @ApiDoc(
     *  resource=true,
     *  description="Return new form"
     * )
     */
    public function newAction()
    {
        return ['form' => $this->createForm(FeatureType::class)];
    }
    /**
     * @return \AppBundle\Repository\FeatureRepository
     */
    private function getFeatureRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Feature');
    }
}