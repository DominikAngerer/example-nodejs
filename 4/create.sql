DROP TABLE IF EXISTS `CREATURE`;

CREATE TABLE `CREATURE` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `CREATURE` WRITE;
/*!40000 ALTER TABLE `CREATURE` DISABLE KEYS */;

INSERT INTO `CREATURE` (`id`, `name`, `type`)
VALUES
	(1,'mike','human'),
	(2,'Rex','dog'),
	(3,'Puss in boots','cat'),
	(4,'Lassie','dog'),
	(5,'Abessinier','horse');

/*!40000 ALTER TABLE `CREATURE` ENABLE KEYS */;
UNLOCK TABLES;