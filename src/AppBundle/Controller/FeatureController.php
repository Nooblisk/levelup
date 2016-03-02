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
     *  description="Returns current user's feature",
     *  statusCodes = {
     *    200 = "Returned when successful",
     *    404 = "Returned when the feature is not found"
     *  }
     * )
     * @param integer $featureId Id of current user's feature
     *
     * @return array
     */
    public function getAction($featureId)
    {
        $feature = $this->getFeatureRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $featureId]);
        if (!$feature) {
            throw $this->createNotFoundException();
        }
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
     *  description="Returns current user's features",
     *  statusCodes = {
     *    200 = "Returned when successful"
     *  }
     * )
     * @return array
     */
    public function cgetAction()
    {
        $features = $this->getFeatureRepository()->findByUser($this->getUser());
        return ['features' => $features];
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
     *  description="Return new form",
     *  statusCodes = {
     *    200 = "Returned when successful"
     *  }
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
     *  description="Creates new feature",
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
     * @param integer $featureId feature id
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
     *  description="Updates a feature",
     *  statusCodes = {
     *    204 = "Returned when successful",
     *    404 = "Returned when the feature is not found"
     *  }
     * )
     *
     * @View(statusCode=204)
     * @param Request $request
     * @param integer $featureId feature id
     * @return array
     */
    public function putAction(Request $request, $featureId)
    {
        $feature = $this->getFeatureRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $featureId]);
        if (!$feature) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(FeatureType::class, $feature);
        $form->submit($request->query->get('feature'));

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($feature);
            $em->flush();
            return null;
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
     *  description="Deletes a feature",
     *  statusCodes = {
     *    204 = "Returned when successful",
     *    404 = "Returned when the feature is not found"
     *  }
     * )
     *
     * @param integer $featureId feature id
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