import { IOrganization } from '@/types/types';
import mongoose, { Schema } from 'mongoose';

const OrganizationSchema: Schema = new Schema({
  org_id: { type: String, required: true, unique: true },
  label: { type: String, required: true }
});

export const Organization = mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema);