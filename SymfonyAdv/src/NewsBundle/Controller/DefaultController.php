<?php

namespace NewsBundle\Controller;

use NewsBundle\Entity\News;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('NewsBundle:Default:index.html.twig');
    }

}
