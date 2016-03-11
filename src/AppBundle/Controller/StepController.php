<?php
/**
 * User: davydov
 * Date: 10.02.2016
 * Time: 18:25
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Quest;
use AppBundle\Entity\Step;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;

class StepController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @return \AppBundle\Repository\StepRepository
     */
    private function getStepRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Step');
    }

    /**
     * @return \AppBundle\Repository\QuestRepository
     */
    private function getQuestRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Quest');
    }

    /**
     * Get all steps completed for a quest
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Quests",
     *  resource=true,
     *  description="Returns all steps assigned to a quest",
     *  statusCodes = {
     *    200 = "Returned when successful"
     *  }
     * )
     * @param integer $featureId Id of a feature
     * @param integer $questId
     *
     * @return array
     */
    public function cgetAction($featureId, $questId)
    {
        $steps = $this->getStepRepository()->findBy([
            'user' => $this->getUser(),
            'quest' => $questId,
        ]);
        return ['steps' => $steps];
    }

    /**
     * Post a new step
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @param Request $request
     * @param integer $featureId id of a feature
     * @param integer $questId

     * @return array
     * @ApiDoc(
     *  section="Quests",
     *  description="Creates new step for a quest",
     *  statusCodes = {
     *    200 = "Returned when successful",
     *    404 = "Returned when quest is not found"
     *  }
     * )
     *
     */
    public function postAction(Request $request, $featureId, $questId)
    {

        $user = $this->getUser();
        $quest = $this->getQuestRepository()->findOneBy([
            'user' => $user,
            'id' => $questId,
        ]);

        if (!$quest) {
            throw $this->createNotFoundException();
        }

        $step = new Step();
        $step->setComment($request->request->get('comment'));
        $step->setQuest($quest);

        $em = $this->getDoctrine()->getManager();
        $em->persist($step);
        $em->flush();
        return ['quest' => $quest];
    }

    /**
     * Deletes a step
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Quests",
     *  description="Deletes a step from a quest",
     *  statusCodes = {
     *    204 = "Returned when successful",
     *    404 = "Returned when the step is not found"
     *  }
     * )
     *
     * @param integer $featureId id of a feature
     * @param integer $questId quest id
     * @param integer $stepId step id
     *
     * @View(statusCode=204)
     */
    public function deleteAction($featureId, $questId, $stepId)
    {
        $step = $this->getStepRepository()->findOneBy([
            'user'=> $this->getUser(), 'id' => $stepId
        ]);
        if (!$step) {
            throw $this->createNotFoundException();
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($step);
        $em->flush();
    }
}