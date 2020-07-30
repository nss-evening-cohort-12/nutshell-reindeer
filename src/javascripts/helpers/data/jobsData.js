import axios from 'axios';
import apiKeys from '../apiKeys.json';
import staffData from './staffData';
// import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const addAssignmentKeys = (data) => {
  const objectCollection = data;
  Object.keys(objectCollection).forEach((itemId) => {
    objectCollection[itemId].assigned = false;
    objectCollection[itemId].assignedTo = [];
  });
  return objectCollection;
};

const getAllJobs = () => new Promise((resolve, reject) => {
  staffData.getStaff()
    .then((allStaff) => {
      axios.get(`${baseUrl}/dinosaurs.json`)
        .then((rawDinos) => {
          axios.get(`${baseUrl}/rides.json`)
            .then((rawRides) => {
              axios.get(`${baseUrl}/vendors.json`)
                .then((rawVendors) => {
                  const dinosaurs = addAssignmentKeys(rawDinos.data);
                  const rides = addAssignmentKeys(rawRides.data);
                  const vendors = addAssignmentKeys(rawVendors.data);
                  const allJobs = {
                    dinosaurs,
                    rides,
                    vendors,
                  };
                  allStaff.forEach((employee) => {
                    if (employee.assignedTo !== '') {
                      allJobs[employee.assignmentCategory][employee.assignedTo].assigned = true;
                      allJobs[employee.assignmentCategory][employee.assignedTo].assignedTo.push(employee);
                    }
                  });
                  resolve(allJobs);
                })
                .catch(((err) => { reject(err); }));
            });
        });
    });
});

const assignNewJob = (staffId, department, job) => new Promise((resolve, reject) => {
  let title = '';
  switch (department) {
    case 'dinosaurs':
      title = 'Dino Handler';
      break;
    case 'rides':
      title = 'Ride Attendant';
      break;
    case 'vendors':
      title = 'Vendor Operator';
      break;
    default:
      title = '';
  }
  staffData.patchStaff(staffId, { assignedTo: job, assignmentCategory: department, title })
    .then(() => {
      resolve();
    })
    .catch((err) => reject(err));
});

// const assignNewJob = (staffId, department, job) => staffData.patchStaff(staffId, { assignedTo: job, assignmentCategory: department });

export default { getAllJobs, assignNewJob };
