<?php
namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @Serializer\ExclusionPolicy("all")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @Serializer\Expose()
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
     * @Serializer\Exclude()
     */
    private $steps;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Achievement", mappedBy="user")
     */
    private $achievements;

    /**
     * @var int
     * @Assert\GreaterThanOrEqual(0)
     * @Serializer\Expose()
     * @ORM\Column(name="level", type="integer")
     */
    private $level = 0;

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

    /**
     * Set level
     *
     * @param integer $level
     *
     * @return Feature
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
     * @return $this
     */
    public function incrementLevel()
    {
        $this->level++;

        return $this;
    }

    /**
     * @return $this
     */
    public function decrementLevel()
    {
        $this->level--;

        return $this;
    }

}
