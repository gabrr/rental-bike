import express from "express"
import startSetup from 'setup/startSetup'
import routesSetup from 'setup/routesSetup'
import middlewaresSetup from "setup/middlewaresSetup"
import "setup/databaseSetup"

export const server = express()

middlewaresSetup(server)
routesSetup(server)
startSetup(server)