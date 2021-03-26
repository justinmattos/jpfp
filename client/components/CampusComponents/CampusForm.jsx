import React, { Component } from 'react';
import { connect } from 'react-redux';
import addCampus from '../../store/addCampus';

class CampusForm extends Component {
  formSubmitAddCampus = (ev) => {
    ev.preventDefault();
    const newCampus = [
      'name',
      'address1',
      'address2',
      'imageURL',
      'description',
    ].reduce((acc, val) => {
      acc[val] = document.querySelector(`#${val}`).value;
      return acc;
    }, {});
    this.props.addCampus(newCampus);
  };
  render() {
    const { campusDetail } = this.props;
    const name = campusDetail.name || '';
    const address = campusDetail.address || '';
    const imageURL = campusDetail.imageURL || '';
    const description = campusDetail.description || '';
    return (
      <form className="form" onSubmit={this.formSubmitAddCampus}>
        <label htmlFor="name">
          <p>Campus Name:</p>
          <input id="name" type="text" defaultValue={name} />
        </label>
        <label htmlFor="address1">
          <p>Campus Address Line 1:</p>
          <input id="address1" type="text" defaultValue={address}></input>
        </label>
        <label htmlFor="address2">
          <p>Campus Address Line 2:</p>
          <input id="address2" type="text" defaultValue={address}></input>
        </label>
        <label htmlFor="imageURL">
          <p>Campus Image URL:</p>
          <input id="imageURL" type="url" defaultValue={imageURL}></input>
        </label>
        <label htmlFor="description">
          <p>Campus Description:</p>
          <textarea
            id="description"
            type="text"
            defaultValue={description}
          ></textarea>
        </label>
        <button>Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { campusDetail } = state;
  return { campusDetail };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addCampus: (newCampus) => dispatch(addCampus(newCampus)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
