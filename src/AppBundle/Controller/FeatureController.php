<?php
/**
 * User: davydov
 * Date: 10.02.2016
 * Time: 18:25
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Feature;
use FOS\RestBundle\Controller\FOSRestController;

class FeatureController extends FOSRestController
{
    public function getAction(Feature $feature)
    {
        return ['feature' => $feature];
    }
}