<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Step
 *
 * @Serializer\ExclusionPolicy("none")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\StepRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Step
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @Assert\Length(min = 2, max = 255)
     * @ORM\Column(name="comment", type="string", length=255, nullable=true)
     */
    private $comment;

    /**
     * @var \DateTime
     * @Assert\DateTime()
     * @ORM\Column(name="completedAt", type="datetime")
     */
    private $completedAt;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="steps")
     * @Serializer\Exclude()
     */
    private $user;

    /**
     * @var Quest
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Quest", inversedBy="steps")
     * @Serializer\Exclude()
     */
    private $quest;

    /**
     * Step constructor.
     *
     */
    public function __construct()
    {
        $this->completedAt = new \DateTime();
    }

    /**
     * Get id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set comment
     *
     * @param string $comment
     *
     * @return Step
     */
    public function setComment($comment)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * Get comment
     *
     * @return string
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set completedAt
     *
     * @param \DateTime $completedAt
     *
     * @return Step
     */
    public function setCompletedAt($completedAt)
    {
        $this->completedAt = $completedAt;

        return $this;
    }

    /**
     * Get completedAt
     *
     * @return \DateTime
     */
    public function getCompletedAt()
    {
        return $this->completedAt;
    }

    /**
     * Set user
     *
     * @param User $user
     *
     * @return Step
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set quest
     *
     * @param Quest $quest
     *
     * @return Step
     */
    public function setQuest(Quest $quest = null)
    {
        $this->quest = $quest;
        $quest->incrementLevel();

        return $this;
    }

    /**
     * Get quest
     *
     * @return Quest
     */
    public function getQuest()
    {
        return $this->quest;
    }


    /**
     * @ORM\PreRemove()
     */
    public function decrementQuestLevelPreRemove()
    {
        $this->getQuest()->decrementLevel();
    }

}
