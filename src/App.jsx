import React from "react";
import Calendar from "rc-year-calendar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/NavBar";
import Container from 'react-bootstrap/Container';
import "rc-year-calendar/locales/rc-year-calendar.es";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: [],
      dataSource: [
        {
          id: 0,
          name: "Cursado de Actualizacion en Sistemas Colaborativos",
          location: "Universidad Siglo 21",
          startDate: new Date(2022, 6, 19),
          endDate: new Date(2022, 11, 17),
        },
        {
          id: 1,
          name: "API 1",
          location: "Universidad Siglo 21",
          startDate: new Date(2022, 7, 21),
          endDate: new Date(2022, 7, 21),
        },
        {
          id: 2,
          name: "API 2",
          location: "Universidad Siglo 21",
          startDate: new Date(2022, 8, 11),
          endDate: new Date(2022, 8, 11),
        },
        {
          id: 3,
          name: "API 3",
          location: "Universidad Siglo 21",
          startDate: new Date(2022, 9, 16),
          endDate: new Date(2022, 9, 16),
        },
        {
          id: 4,
          name: "API 4",
          location: "Universidad Siglo 21",
          startDate: new Date(2022, 10, 13),
          endDate: new Date(2022, 10, 13),
        },
      ],
      currentEvent: null,
    };
  }

  saveCurrentEvent() {
    if (this.state.currentEvent.id === undefined) {
      // Add event
      this.state.currentEvent.id =
        Math.max(...this.state.dataSource.map((evt) => evt.id)) + 1;
      this.setState({
        dataSource: this.state.dataSource.concat([this.state.currentEvent]),
        currentEvent: null,
      });
    } else {
      // Update event
      var ds = this.state.dataSource;
      var index = ds.findIndex((evt) => evt.id == this.state.currentEvent.id);
      ds[index] = this.state.currentEvent;
      this.setState({ dataSource: ds, currentEvent: null });
    }

    this.setState({ currentEvent: null });
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              Starkbucks - Calendario Compartido
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div>
          <div id="events-log">
            <h3>Eventos</h3>
            {this.state.logs.map((log, i) => (
              <div key={i}>
                <div>{log.name}</div>
                <div>{log.location}</div>
                <div>{log.startDate?.toLocaleDateString()} - {log.endDate?.toLocaleDateString()}</div>
                <div>&nbsp;</div>
              </div>
            ))}
          </div>
          <Calendar
            style="background"
            enableRangeSelection={true}
            enableContextMenu={true}
            contextMenuItems={[
              {
                text: "Update",
                click: (evt) => this.setState({ currentEvent: evt }),
              },
              {
                text: "Delete",
                click: (evt) =>
                  this.setState({
                    dataSource: this.state.dataSource.filter(
                      (item) => item.id != evt.id
                    ),
                  }),
              },
            ]}
            onRangeSelected={(e) =>
              this.setState({
                currentEvent: { startDate: e.startDate, endDate: e.endDate },
              })
            }
            dataSource={this.state.dataSource}
            onDayClick={e =>  {this.setState({ logs: e.events }); console.log(this.state.logs)} }
          />
          <Modal
            show={this.state.currentEvent}
            onHide={() => this.setState({ currentEvent: null })}
          >
            {this.state.currentEvent && (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {this.state.currentEvent.id !== undefined
                      ? "Update event"
                      : "Add event"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="form-horizontal">
                    <div className="form-group row">
                      <label
                        htmlFor="event-name"
                        className="col-sm-2 control-label"
                      >
                        Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          id="event-name"
                          type="text"
                          className="form-control"
                          value={this.state.currentEvent.name}
                          onChange={(e) =>
                            this.setState({
                              currentEvent: {
                                ...this.state.currentEvent,
                                name: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="event-location"
                        className="col-sm-2 control-label"
                      >
                        Location
                      </label>
                      <div className="col-sm-10">
                        <input
                          id="event-location"
                          type="text"
                          className="form-control"
                          value={this.state.currentEvent.location}
                          onChange={(e) =>
                            this.setState({
                              currentEvent: {
                                ...this.state.currentEvent,
                                location: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="min-date"
                        className="col-sm-2 control-label"
                      >
                        Dates
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group input-daterange">
                          <input
                            id="min-date"
                            type="date"
                            className="form-control"
                            value={this.state.currentEvent.startDate
                              .toISOString()
                              .substr(0, 10)}
                            onChange={(e) =>
                              this.setState({
                                currentEvent: {
                                  ...this.state.currentEvent,
                                  startDate: e.target.valueAsDate,
                                },
                              })
                            }
                          />
                          <div className="input-group-prepend input-group-append">
                            <div className="input-group-text">to</div>
                          </div>
                          <input
                            type="date"
                            className="form-control"
                            value={this.state.currentEvent.endDate
                              .toISOString()
                              .substr(0, 10)}
                            onChange={(e) =>
                              this.setState({
                                currentEvent: {
                                  ...this.state.currentEvent,
                                  endDate: e.target.valueAsDate,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => this.setState({ currentEvent: null })}
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => this.saveCurrentEvent()}
                  >
                    Save event
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </Modal>
        </div>
      </>
    );
  }
}

export default App;
