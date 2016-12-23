<?php

namespace NewsBundle\Listener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Psr\Log\LoggerInterface;

class PostRemoveLogger
{
    protected $service_container;
    public $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function postRemove(LifecycleEventArgs $event)
    {
        $this->logger->info('NewsBundle : Post deleted');
    }
}
