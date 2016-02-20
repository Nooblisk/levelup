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
     *  section="Features",
     *  resource=true,
     *  description="Returns current user's feature"
     * )
     * @param integer $featureId Id of current user's feature
     *
     * @return array
     */
    public function getAction($featureId)
    {
        $feature = $this->getFeatureRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $featureId]);
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
     *  section="Features",
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
     * Request fields for a new form
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>

     * @ApiDoc(
     *  section="Features",
     *  resource=true,
     *  description="Return new form"
     * )
     */
    public function newAction()
    {
        return ['form' => $this->createForm(FeatureType::class)];
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
     *  section="Features",
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
     * Request edit form for an existing feature
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     * @ApiDoc(
     *  section="Features",
     *  resource=true,
     *  description="Return edit form for a feature"
     * )
     *
     * @param $featureId feature id
     *
     * @return \Symfony\Component\Form\Form
     */
    public function editAction($featureId)
    {
        $feature = $this->getFeatureRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $featureId]);
        if (!$feature) {
            throw $this->createNotFoundException();
        }

        return $this->createForm(FeatureType::class, $feature);
    }

    /**
     * Updates a feature
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Features",
     *  description="Updates a feature"
     * )
     *
     * @param $featureId feature id
     *
     * @return array
     */
    public function putAction($featureId)
    {
        $feature = $this->getFeatureRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $featureId]);
        if (!$feature) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(FeatureType::class, $feature);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($feature);
            $em->flush();
            return ['feature' => $feature];
        }

        return ['form' => $form];
    }

    /**
     * Deletes a feature
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Features",
     *  description="Deletes a feature"
     * )
     *
     * @param $featureId feature id
     *
     * @View(statusCode=204)
     */
    public function deleteAction($featureId)
    {
        $feature = $this->getFeatureRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $featureId]);
        if (!$feature) {
            throw $this->createNotFoundException();
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($feature);
        $em->flush();
    }


    /**
     * @return \AppBundle\Repository\FeatureRepository
     */
    private function getFeatureRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Feature');
    }
}