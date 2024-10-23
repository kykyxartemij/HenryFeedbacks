-- CreateTable
CREATE TABLE `Feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `andmebaasid` INTEGER NOT NULL,
    `hajusrakenduste_alused` INTEGER NOT NULL,
    `matemaatika` INTEGER NOT NULL,
    `eesti_keel` INTEGER NOT NULL,
    `tarkvaraarenduse_meetodid` INTEGER NOT NULL,
    `hajusrakenduste_alused_2` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
