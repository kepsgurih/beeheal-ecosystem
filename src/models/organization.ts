import { IOrganization } from '@/types/types';
import mongoose, { Schema } from 'mongoose';

const OrganizationSchema: Schema = new Schema({
  users: [{
    userid: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    }
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
    userid: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    }
  }
});

const Organization = mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema);
export default Organization;
