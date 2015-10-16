/*
 * GET home page.
 */

var FlightSchema = require('../schemas/flight');

module.exports = function (flights) {
    var flightModule = require('../flight');

    for (var number in flights) {
        flights[number] = flightModule.create(flights[number]);
    }

    var functions = {
        flight: function (req, res) {
            var number = req.param('number');

            if (typeof flights[number] === 'undefined') {
                res.status(404).json({
                    status: 'Error',
                    message: 'Invalid flight number: ' + number
                });
            } else {
                res.json(flights[number].getInformation());
            }
        },
        arrived: function (req, res) {
            var number = req.param('number');

            if (typeof flights[number] === 'undefined') {
                res.status(404).json({
                    status: 'Error',
                    message: 'Invalid flight number: ' + number
                });
            } else {
                flights[number].triggerArrive();

                var record = new FlightSchema(flights[number].getInformation());
                record.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({status: 'Database failure'});
                    } else {
                        res.json({
                            status: 'Successfully arrived',
                            info: flights[number].getInformation()
                        });
                    }
                });
            }
        },
        list: function (req, res) {
            res.render('list', {
                title: 'All Flights',
                flights: flights
            });
        },
        listjson: function (req, res) {
            var flightData = [];
            for (var number in flights) {
                flightData.push(flights[number].getInformation());
            }
            res.json(flightData);
        }
    };
    return functions;
};