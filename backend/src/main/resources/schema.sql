-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Account` (
  `account_id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `full_name` VARCHAR(45) NOT NULL,
  `role` ENUM('driver', 'manager', 'admin') NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Driver`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Driver` (
  `id` INT NOT NULL,
  `account_id` INT NOT NULL,
  `plate_number` VARCHAR(45) NOT NULL,
  `payment_method` ENUM('cash', 'visa') NOT NULL,
  `penality_counter` INT NOT NULL,
  `is_banned` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `driver_account_Id_idx` (`account_id` ASC) VISIBLE,
  UNIQUE INDEX `plate_number_UNIQUE` (`plate_number` ASC) VISIBLE,
  CONSTRAINT `driver_account_Id`
    FOREIGN KEY (`account_id`)
    REFERENCES `mydb`.`Account` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Parking_Lot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Parking_Lot` (
  `lot_id` INT NOT NULL,
  `manager_id` INT NOT NULL,
  `longitude` DECIMAL(9,6) NOT NULL,
  `latitude` DECIMAL(9,6) NOT NULL,
  `capacity` INT NOT NULL,
  `original_price` DECIMAL(5,2) NOT NULL,
  `dynamic_weight` DECIMAL(3,2) NOT NULL,
  `disabled_discount` DECIMAL(3,2) NOT NULL,
  `ev_fees` DECIMAL(3,2) NOT NULL,
  PRIMARY KEY (`lot_id`),
  INDEX `lot_manager_id_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `lot_manager_id`
    FOREIGN KEY (`manager_id`)
    REFERENCES `mydb`.`Account` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Parking_Spot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Parking_Spot` (
  `spot_id` INT NOT NULL,
  `lot_id` INT NOT NULL,
  `type` ENUM('disabled', 'regular', 'ev') NOT NULL,
  `status` ENUM('available', 'occupied', 'reserved') NOT NULL,
  `Parking_Spotcol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`spot_id`),
  INDEX `spot_lot_idx` (`lot_id` ASC) VISIBLE,
  CONSTRAINT `spot_lot`
    FOREIGN KEY (`lot_id`)
    REFERENCES `mydb`.`Parking_Lot` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Reservation` (
  `reservation_id` INT NOT NULL,
  `spot_id` INT NOT NULL,
  `driver_id` INT NOT NULL,
  `start_hour` INT NOT NULL,
  `duration` INT NOT NULL,
  `date` DATE NOT NULL,
  `is_arrived` TINYINT NOT NULL,
  PRIMARY KEY (`reservation_id`),
  INDEX `reservation_spot_id_idx` (`spot_id` ASC) VISIBLE,
  INDEX `reservation_driver_id_idx` (`driver_id` ASC) VISIBLE,
  CONSTRAINT `reservation_spot_id`
    FOREIGN KEY (`spot_id`)
    REFERENCES `mydb`.`Parking_Spot` (`spot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `reservation_driver_id`
    FOREIGN KEY (`driver_id`)
    REFERENCES `mydb`.`Driver` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
