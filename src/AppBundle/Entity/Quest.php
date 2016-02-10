<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Quest
 *
 * @ORM\Entity(repositoryClass="AppBundle\Repository\QuestRepository")
 */
class Quest
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
     *
     * @ORM\Column(type="string", length=64)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var int
     *
     * @ORM\Column(name="level", type="integer")
     */
    private $level = 0;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="quests")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Feature", inversedBy="quests")
     */
    private $feature;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Step", mappedBy="quest")
     */
    private $steps;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Quest
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Quest
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set level
     *
     * @param integer $level
     *
     * @return Quest
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get level
     *
     * @return int
     */
    public function getLevel()
    {
        return $this->level;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->steps = new ArrayCollection();
    }

    /**
     * Set user
     *
     * @param User $user
     *
     * @return Quest
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
     * Set features
     *
     * @param Feature $feature
     *
     * @return Quest
     */
    public function setFeature(Feature $feature = null)
    {
        $this->feature = $feature;

        return $this;
    }

    /**
     * Get features
     *
     * @return Feature
     */
    public function getFeature()
    {
        return $this->feature;
    }

    /**
     * Add step
     *
     * @param Step $step
     *
     * @return Quest
     */
    public function addStep(Step $step)
    {
        $this->steps[] = $step;

        return $this;
    }

    /**
     * Remove step
     *
     * @param Step $step
     */
    public function removeStep(Step $step)
    {
        $this->steps->removeElement($step);
    }

    /**
     * Get steps
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSteps()
    {
        return $this->steps;
    }
}
