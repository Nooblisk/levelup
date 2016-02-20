<?php
/**
 * User: davydov
 * Date: 20.02.2016
 * Time: 15:20
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;

class QuestController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @return \AppBundle\Repository\QuestRepository
     */
    private function getQuestRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Quest');
    }

    /**
     * Returns a quest assigned to a feature by its id created by current user
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Quests",
     *  resource=true,
     *  description="Returns current user's quest"
     * )
     * @param integer $featureId Id of a feature
     * @param integer $questId   Id of a quest
     *
     * @return array
     */
    public function getAction($featureId, $questId)
    {
        $quest = $this->getQuestRepository()->findOneBy(['user'=> $this->getUser(), 'feature' => $featureId, 'id' => $questId]);
        return ['quest' => $quest];
    }

    /**
     * Get all quests assigned to a feature
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Quests",
     *  resource=true,
     *  description="Returns current user's quests"
     * )
     * @param integer $featureId Id of a feature
     *
     * @return array
     */
    public function cgetAction($featureId)
    {
        return ['quests' => $this->getQuestRepository()->findBy(['user'=> $this->getUser(), 'feature' => $featureId])];
    }

}