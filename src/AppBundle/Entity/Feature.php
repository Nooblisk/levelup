<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Feature
 *
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FeatureRepository")
 * @Serializer\ExclusionPolicy("none")
 */
class Feature
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
     * @Assert\NotBlank()
     * @Assert\Length(min = 2, max = 64)
     * @ORM\Column(type="string", length=64)
     */
    private $title;

    /**
     * @var string
     * @Assert\NotBlank()
     * @Assert\Length(min = 2, max = 255)
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var string
     * @Assert\Url()
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imageUrl;

    /**
     * @var int
     * @Assert\GreaterThanOrEqual(0)
     * @ORM\Column(name="level", type="integer")
     */
    private $level = 0;

    /**
     * @var int
     * @Assert\GreaterThan(0)
     * @ORM\Column(name="max_level", type="integer")
     */
    private $maxLevel = 5;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="features")
     * @Serializer\Exclude()
     */
    private $user;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Quest", mappedBy="feature")
     * @Serializer\Exclude()
     */
    private $quests;

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
     * @return Feature
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
     * @return Feature
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
     * Set imageUrl
     *
     * @param string $imageUrl
     *
     * @return Feature
     */
    public function setImageUrl($imageUrl)
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    /**
     * Get imageUrl
     *
     * @return string
     */
    public function getImageUrl()
    {
        return $this->imageUrl;
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
        if($this->getLevel() >= $this->getMaxLevel()) {
            $this->getUser()->incrementLevel();
            $this->setLevel(0);
        }

        return $this;
    }

    /**
     * @return $this
     */
    public function decrementLevel()
    {
        $user = $this->getUser();
        if($this->getLevel() === 0 && $user->getLevel() > 0) {
            $this->setLevel($this->getMaxLevel()-1);
            $user->decrementLevel();
        }
        $this->level--;

        return $this;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->quests = new ArrayCollection();
    }

    /**
     * Set user
     *
     * @param User $user
     *
     * @return Feature
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
     * Add quest
     *
     * @param Quest $quest
     *
     * @return Feature
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
     * @return mixed
     */
    public function getMaxLevel()
    {
        return $this->maxLevel;
    }

    /**
     * @param mixed $maxLevel
     *
     * @return Feature
     */
    public function setMaxLevel($maxLevel)
    {
        $this->maxLevel = $maxLevel;

        return $this;
    }
}
