# Export von Tabelle CREATURE
# ------------------------------------------------------------

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
	(50,'Haugo','human');

/*!40000 ALTER TABLE `CREATURE` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle USER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USER`;

CREATE TABLE `USER` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `vname` varchar(255) DEFAULT NULL,
  `nname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `size` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;

INSERT INTO `USER` (`id`, `vname`, `nname`, `address`, `password`, `size`)
VALUES
	(1,'Thomas','Pink','Hier','test',4),
	(2,'Mike','Penz','Freistadt','SHA512',0);

/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;