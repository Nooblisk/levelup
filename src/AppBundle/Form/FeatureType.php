<?php

namespace AppBundle\Form;

use AppBundle\Entity\Feature;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FeatureType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
            ->add('maxLevel')
            ->add('imageUrl')
        ;

        $data = $builder->getData();
        if ($data instanceof Feature && $data->getId()) {
           $builder->add('id');
        }
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Feature',
            'csrf_protection' => false,
        ));
    }
}
