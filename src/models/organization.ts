import { IOrganization } from '@/types/types';
import mongoose, { Schema } from 'mongoose';

const OrganizationSchema: Schema = new Schema({
  users: [{
    type: String
  }],
  label: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    require: true,
    default: true
  },
  owner: {
    type: String
  }
});

const Organization = mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema);
export default Organization;
