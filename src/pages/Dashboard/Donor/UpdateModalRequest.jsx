import React from 'react'

const UpdateModalRequest = ({editModalData, handleSaveUpdate, setEditModalData}) => {
  return (
     <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Update Donation Request</h3>
            {/* recipient */}
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Recipient Name"
              value={editModalData.recipientName}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  recipientName: e.target.value,
                })
              }
            />
            {/* blood group */}
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Blood Group"
              value={editModalData.bloodGroup}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  bloodGroup: e.target.value,
                })
              }
            />
            {/* district */}
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="District"
              value={editModalData.recipientDistrict}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  recipientDistrict: e.target.value,
                })
              }
            />
            {/* upazila */}
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Upazila"
              value={editModalData.recipientUpazila}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  recipientUpazila: e.target.value,
                })
              }
            />
            {/* hospital name */}
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Hospital Name"
              value={editModalData.hospitalName}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  hospitalName: e.target.value,
                })
              }
            />
            {/* donation date */}
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={editModalData.donationDate}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  donationDate: e.target.value,
                })
              }
            />
            {/* donation time */}
            <input
              type="time"
              className="w-full px-3 py-2 border rounded"
              value={editModalData.donationTime}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  donationTime: e.target.value,
                })
              }
            />

            {/* Add more fields as needed */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditModalData(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSaveUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
  )
}

export default UpdateModalRequest