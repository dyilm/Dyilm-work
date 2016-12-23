<?php

namespace BadgeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('BadgeBundle:Default:index.html.twig');
    }
}
