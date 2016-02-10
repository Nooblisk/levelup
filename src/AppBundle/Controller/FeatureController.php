<?php
/**
 * User: davydov
 * Date: 10.02.2016
 * Time: 18:25
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Feature;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class FeatureController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @ApiDoc(
     *  resource=true,
     *  description="Returns a feature"
     * )
     * @param Feature $feature A feature added by user
     * @return array
     */
    public function getAction(Feature $feature)
    {
        return ['feature' => $feature];
    }

    /**
     * @return array
     */
    public function cgetAction()
    {
        return ['features' => $this->getDoctrine()->getRepository('AppBundle:Feature')->findAll()];
    }
}