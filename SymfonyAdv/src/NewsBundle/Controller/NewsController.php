<?php

namespace NewsBundle\Controller;

use NewsBundle\Entity\News;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class NewsController extends Controller
{
    public function indexAction()
    {
        /* Get all news */
        $repository = $this->getDoctrine()->getRepository('NewsBundle:News');
        $news = $repository->findAll();

        return $this->render('NewsBundle:Default:index.html.twig', array(
            'arrnews' => $news,
        ));
    }

    public function createAction()
    {
        /* Create news */
        $data = [
            'title' => 'Aquae supplex',
            'content' => file_get_contents('http://loripsum.net/api/10/short/plaintext'),
            'author' => 'Deniz Y'
        ];

        $news = new News();
        $news->setTitle($data['title']);
        $news->setContent($data['content']);
        $news->setAuthor($data['author']);
        //YYYY-MM-DD HH:MM:SS

        $news->setCreated(new \DateTime("now"));
        $news->setUpdated(new \DateTime("now"));


        /* Get & call Doctrine */
        $em = $this->getDoctrine()->getManager();
        $em->persist($news);

        /* Insert in database */
        $em->flush();

        return new Response('Saved new News with id '.$news->getId(), Response::HTTP_OK);
    }

    public function showAction($id)
    {
        /* Get news */
        $repository = $this->getDoctrine()->getRepository('NewsBundle:News');
        $news = $repository->findOneById($id);

        /* If news not found */
        if (!$news) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        return $this->render('NewsBundle:Default:show.html.twig', array(
            'news'      => $news,
        ));
    }

    public function removeAction($id)
    {
        /* Get news */
        $repository = $this->getDoctrine()->getRepository('NewsBundle:News');
        $news = $repository->findOneById($id);

        /* If news not found */
        if (!$news) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }

        /* Remove news */
        $em = $this->getDoctrine()->getManager();
        $em->remove($news);
        $em->flush();

        /* Lancer un évenement */

        return new Response('News deleted with id '.$id, Response::HTTP_OK);
    }
}
