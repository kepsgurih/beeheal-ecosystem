import React from "react";

export default function Page(){
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        {/* Card */}
        <div className="card bg-base-100 shadow-lg">
          {/* Card Header */}
          <div className="card-body gap-6">
            <div className="border-b pb-4">
              <h2 className="card-title text-xl font-semibold">Edit Profile</h2>
            </div>

            {/* Form Section */}
            <div className="flex flex-col gap-6">
              {/* First Name Field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter First Name" 
                  className="input input-bordered w-full" 
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    First Name will be displayed in the application
                  </span>
                </label>
              </div>

              {/* Last Name Field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Last Name" 
                  className="input input-bordered w-full" 
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Last Name will be displayed in the application
                  </span>
                </label>
              </div>
            </div>

            {/* Card Footer with Save Button */}
            <div className="card-actions mt-4 border-t pt-4">
              <button className="btn btn-primary w-full">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};