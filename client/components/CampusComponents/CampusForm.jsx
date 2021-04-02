import React, { Component } from 'react';
import { connect } from 'react-redux';
import addCampus from '../utils/addCampus';
import editCampus from '../utils/editCampus';
import { fetchCampusDetail } from '../../store/campus/campusDetail';

class CampusForm extends Component {
  componentDidMount() {
    const { campusId, editMode } = this.props;
    if (editMode) {
      this.props.fetchCampusDetail(campusId);
    }
  }

  getFormValues = () => {
    return ['name', 'address1', 'address2', 'imageURL', 'description'].reduce(
      (acc, val) => {
        acc[val] = document.querySelector(`#${val}`).value;
        return acc;
      },
      {}
    );
  };

  formSubmit = (ev) => {
    const { editMode, campusId } = this.props;
    ev.preventDefault();
    if (editMode) {
      this.props.editCampus(this.getFormValues(), campusId);
    } else {
      this.props.addCampus(this.getFormValues());
    }
  };

  render() {
    const { campusDetail, editMode } = this.props;
    const name = campusDetail.name || '';
    const address = campusDetail.address || '';
    const [address1, address2] = address.split('\n');
    const imageURL = campusDetail.imageURL || '';
    const description = campusDetail.description || '';
    return (
      <form className="form" onSubmit={this.formSubmit}>
        <h2>{editMode ? 'Edit' : 'Add a'} Campus</h2>
        <label htmlFor="name">
          <p>Campus Name:</p>
          <input id="name" type="text" defaultValue={name} />
        </label>
        <label htmlFor="address1">
          <p>Campus Address Line 1:</p>
          <input id="address1" type="text" defaultValue={address1}></input>
        </label>
        <label htmlFor="address2">
          <p>Campus Address Line 2:</p>
          <input id="address2" type="text" defaultValue={address2}></input>
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
  const { campusId } = ownProps.match.params;
  const { campusDetail } = state;
  const editMode = !!campusId;
  return { campusDetail, editMode, campusId };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    addCampus: (newCampus) => {
      addCampus(newCampus, history);
    },
    editCampus: (updatedCampus, campusId) => {
      editCampus(updatedCampus, campusId, history);
    },
    fetchCampusDetail: (id) => {
      dispatch(fetchCampusDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
