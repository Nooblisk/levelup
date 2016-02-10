<?php
namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Feature", mappedBy="user")
     */
    private $features;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Quest", mappedBy="user")
     */
    private $quests;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Step", mappedBy="user")
     */
    private $steps;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Achievement", mappedBy="user")
     */
    private $achievements;

    public function __construct()
    {
        $this->features = new ArrayCollection();
        $this->quests = new ArrayCollection();
        $this->steps = new ArrayCollection();
        $this->achievements= new ArrayCollection();
        parent::__construct();
    }

    /**
     * Add feature
     *
     * @param Feature $feature
     *
     * @return User
     */
    public function addFeature(Feature $feature)
    {
        $this->features[] = $feature;

        return $this;
    }

    /**
     * Remove feature
     *
     * @param Feature $feature
     */
    public function removeFeature(Feature $feature)
    {
        $this->features->removeElement($feature);
    }

    /**
     * Get features
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFeatures()
    {
        return $this->features;
    }

    /**
     * Add quest
     *
     * @param Quest $quest
     *
     * @return User
     */
    public function addQuest(Quest $quest)
    {
        $this->quests[] = $quest;

        return $this;
    }

    /**
     * Remove quest
     *
     * @param Quest $quest
     */
    public function removeQuest(Quest $quest)
    {
        $this->quests->removeElement($quest);
    }

    /**
     * Get quests
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getQuests()
    {
        return $this->quests;
    }

    /**
     * Add step
     *
     * @param Step $step
     *
     * @return User
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

    /**
     * Add achievement
     *
     * @param Achievement $achievement
     *
     * @return User
     */
    public function addAchievement(Achievement $achievement)
    {
        $this->achievements[] = $achievement;

        return $this;
    }

    /**
     * Remove achievement
     *
     * @param Achievement $achievement
     */
    public function removeAchievement(Achievement $achievement)
    {
        $this->achievements->removeElement($achievement);
    }

    /**
     * Get achievements
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAchievements()
    {
        return $this->achievements;
    }
}
