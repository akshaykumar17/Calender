import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

import * as actions from '../actions';
import { selectList } from '../selectors';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Basic extends Component {
  constructor(props) {
    super(props)


    this.state = {
      events: props.events
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  addNewEvent() {
    let title = this.refs.title.value;
    let start = new Date(this.refs.start.value);
    let end = new Date(this.refs.end.value);
    let color = this.refs.color.value;

    console.log(title, start, end);
    if (color) {
      this.props.addEvent({ title, start, end, color });
    } else {
      this.props.addEvent({ title, start, end });
    }
  }

  addEventTab() {
    return (
      <div className="container">
        <button type="button" className="btn btn-info btn-md" data-toggle="modal" data-target="#myModal">Add Event</button>

        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Modal Header</h4>
              </div>

              <div className="modal-body">
                <form >
                  <div className="form-group">
                    <span> Event Name: </span>
                    <div className='input-group' id="event">
                      <input type='text ' ref="title" className="form-control" />
                      <div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <span> Choose Color for Event: </span>
                    <div id="cp2" className="input-group colorpicker-component">
                      <input type="text" ref="color" className="form-control" placeholder="Default color is Green" />
                      <span className="input-group-addon"><i></i></span>
                    </div>
                    {/*<p>
                    <a className="btn btn-sm btn-default enable-button" href="#">Enable</a>
                    <a className="btn btn-sm btn-default disable-button" href="#">Disable</a>
                  </p>*/}
                  </div>
                  <div className="form-group">
                    <span > Start Date: </span>
                    <div className='input-group date' id='datepicker1' name="startdate">
                      <input type='text' ref="start" className="form-control" />
                      <div className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <span> End Date: </span>
                    <div className='input-group date' id='datepicker2' name="enddate">
                      <input type='text' ref="end" className="form-control" />
                      <div className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" data-dismiss="modal" onClick={this.addNewEvent.bind(this)} >Submit</button>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  moveEvent({ event, start, end }) {
    const {events} = this.state;

    let idx = this.state.events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)
    if (this.state.events !== nextEvents) {

      this.setState({
        events: nextEvents
      })
      this.props.updateEventChange(nextEvents);
    }
  }

  render() {
    const {events} = this.state;

    return (
      <div>
        {this.addEventTab()}
        <div>
          <DragAndDropCalendar
            selectable
            {...this.props}
            step={15}
            timeslots={8}
            events={this.props.events}
            onEventDrop={this.moveEvent}
            defaultDate={new Date()}
            scrollToTime={new Date(1970, 1, 1, 6)}
            onSelectEvent={event => alert(event.title)}
          />
          {/*onSelectSlot={() =>  }*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: selectList(state)
  }
}

const BasicConnect = connect(
  mapStateToProps,
  actions
)(Basic);


export default DragDropContext(HTML5Backend)(BasicConnect);
