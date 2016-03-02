<?php
/**
 * User: davydov
 * Date: 20.02.2016
 * Time: 15:20
 */

namespace AppBundle\Controller;

use AppBundle\Form\QuestType;
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
     * @return \AppBundle\Repository\FeatureRepository
     */
    private function getFeatureRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Feature');
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
     *  description="Returns current user's quest",
     *  statusCodes = {
     *    200 = "Returned when successful",
     *    404 = "Returned when the quest or feature is not found"
     *  }
     * )
     * @param integer $featureId Id of a feature
     * @param integer $questId   Id of a quest
     *
     * @return array
     */
    public function getAction($featureId, $questId)
    {
        $quest = $this->getQuestRepository()->findOneBy([
            'user'=> $this->getUser(),
            'feature' => $featureId,
            'id' => $questId
        ]);
        if (!$quest) {
            throw $this->createNotFoundException();
        }
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
     *  description="Returns current user's quests",
     *  statusCodes = {
     *    200 = "Returned when successful"
     *  }
     * )
     * @param integer $featureId Id of a feature
     *
     * @return array
     */
    public function cgetAction($featureId)
    {
        $quests = $this->getQuestRepository()->findBy(['user' => $this->getUser(), 'feature' => $featureId]);
        return ['quests' => $quests];
    }

    /**
     * Request fields for a new form
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>

     * @ApiDoc(
     *  section="Quests",
     *  resource=true,
     *  description="Returns new form",
     *  statusCodes = {
     *    200 = "Returned when successful"
     *  }
     * )
     */
    public function newAction()
    {
        return ['form' => $this->createForm(QuestType::class)];
    }

    /**
     * Post a new quest
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @param Request $request
     * @param integer $featureId id of a feature
     *
     * @return array
     * @ApiDoc(
     *  section="Quests",
     *  description="Creates new quest",
     *  statusCodes = {
     *    200 = "Returned when successful",
     *    400 = "Returned when the form contains an error",
     *    404 = "Returned when feature is not found"
     *  }
     * )
     *
     */
    public function postAction(Request $request, $featureId)
    {
        $form = $this->createForm(QuestType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $this->getUser();
            $feature = $this->getFeatureRepository()->findOneBy(['user'=> $user, 'id' => $featureId]);
            if (!$feature) {
                throw $this->createNotFoundException();
            }

            $quest = $form->getData();
            $quest->setUser($user);
            $quest->setFeature($feature);
            $em = $this->getDoctrine()->getManager();
            $em->persist($quest);
            $em->flush();
            return ['quest' => $quest];
        }

        return ['form' => $form];
    }

    /**
     * Updates a quest
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Quests",
     *  description="Updates a quest",
     *  statusCodes = {
     *    204 = "Returned when successful",
     *    404 = "Returned when the quest is not found"
     *  }
     * )
     *
     * @View(statusCode=204)
     * @param integer $featureId id of a feature
     * @param integer $questId quest id
     *
     * @return array
     */
    public function putAction(Request $request, $featureId, $questId)
    {
        $quest = $this->getQuestRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $questId]);
        if (!$quest) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(QuestType::class, $quest);
//        $form->submit($request->query->get('feature'));

        if ($form->handleRequest($request)->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($quest);
            $em->flush();
            return null;
        }

        return ['form' => $form];
    }

    /**
     * Deletes a quest
     *
     * **Request header**
     *
     *      Authorization: Bearer <token>
     *
     * @ApiDoc(
     *  section="Quests",
     *  description="Deletes a quest",
     *  statusCodes = {
     *    204 = "Returned when successful",
     *    404 = "Returned when the quest is not found"
     *  }
     * )
     *
     * @param integer $featureId id of a feature
     * @param integer $questId quest id
     *
     * @View(statusCode=204)
     */
    public function deleteAction($featureId, $questId)
    {
        $quest = $this->getQuestRepository()->findOneBy(['user'=> $this->getUser(), 'id' => $questId]);
        if (!$quest) {
            throw $this->createNotFoundException();
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($quest);
        $em->flush();
    }
}