import React, { Component } from 'react';
import { connect } from 'react-redux';
import addCampus from '../utils/addCampus';
import editCampus from '../utils/editCampus';
import { fetchCampusDetail } from '../../store/campus/campusDetail';

class CampusForm extends Component {
  state = {
    formData: {
      name: '',
      address1: '',
      address2: '',
      imageURL: '',
      description: '',
    },
  };

  componentDidMount() {
    const {
      editMode,
      campusDetail: { name, address1, address2, imageURL, description },
      fetchCampusDetail,
      campusId,
    } = this.props;
    if (editMode) {
      this.setState({
        formData: { name, address1, address2, imageURL, description },
      });
      fetchCampusDetail(campusId);
    }
  }

  componentDidUpdate = ({ campusDetail: { campusId: prevCampusId } }) => {
    const { campusDetail } = this.props;
    const {
      campusId,
      name,
      address1,
      address2,
      imageURL,
      description,
    } = campusDetail;
    if (campusId !== prevCampusId) {
      this.setState({
        formData: { name, address1, address2, imageURL, description },
      });
    }
  };

  formChange = ({ target: { name, value, parentNode } }) => {
    if (name !== 'imageURL' && name !== 'description') {
      if (!value) {
        parentNode.className = 'invalid';
      } else {
        parentNode.className = '';
      }
    }
    this.setState({ formData: { [name]: value || '' } });
  };

  formSubmit = (ev) => {
    ev.preventDefault();
    const { editMode, campusId, editCampus, addCampus } = this.props;
    const { formData } = this.state;
    let validForm = true;
    for (const key in formData) {
      if (key !== 'imageURL' && key !== 'description') {
        if (!formData[key]) {
          document.querySelector(`#${key}`).parentNode.className = 'invalid';
          validForm = false;
        }
      } else {
        if (!formData[key]) {
          formData[key] = undefined;
        }
      }
    }
    if (validForm) {
      if (editMode) {
        editCampus(formData, campusId);
      } else {
        addCampus(formData);
      }
    } else {
      alert('Please fill all required fields');
    }
  };

  render() {
    const { editMode } = this.props;
    const {
      formData: { name, address1, address2, imageURL, description },
    } = this.state;
    return (
      <div>
        <h2 className="form-title">{editMode ? 'Edit' : 'Add a'} Campus</h2>
        <form className="form" onSubmit={this.formSubmit}>
          <label htmlFor="name">
            <p>Campus Name:</p>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={this.formChange}
              placeholder="Required"
            />
          </label>
          <label htmlFor="address1">
            <p>Campus Address Line 1:</p>
            <input
              id="address1"
              name="address1"
              type="text"
              value={address1}
              onChange={this.formChange}
              placeholder="Required"
            />
          </label>
          <label htmlFor="address2">
            <p>Campus Address Line 2:</p>
            <input
              id="address2"
              name="address2"
              type="text"
              value={address2}
              onChange={this.formChange}
              placeholder="Required"
            />
          </label>
          <label htmlFor="imageURL">
            <p>Campus Image URL:</p>
            <input
              id="imageURL"
              name="imageURL"
              type="url"
              value={imageURL}
              onChange={this.formChange}
            />
          </label>
          <label htmlFor="description">
            <p>Campus Description:</p>
            <textarea
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={this.formChange}
            ></textarea>
          </label>
          <button>Submit</button>
        </form>
      </div>
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
