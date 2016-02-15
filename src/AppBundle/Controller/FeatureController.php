<?php
/**
 * User: davydov
 * Date: 10.02.2016
 * Time: 18:25
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Feature;
use AppBundle\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;

class FeatureController extends FOSRestController implements ClassResourceInterface
{
    /**
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
     * @param Request $request
     * @ApiDoc(
     *  resource=true,
     *  description="Creates new feature"
     * )
     */
    public function newAction(Request $request)
    {

    }

    /**
     * @return \AppBundle\Repository\FeatureRepository
     */
    private function getFeatureRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Feature');
    }
}