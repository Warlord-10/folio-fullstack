export default function AddFileOrFolderForm({ type, onSubmit, onCancel }){
    return (
      <form onSubmit={onSubmit} className='flex justify-between p-3'>
        <input
          name={`${type}_name`}
          className='p-1 text-black rounded-md'
          placeholder={`${type} name`}
          type='text'
        />
        <div className='flex gap-2'>
          <button type='submit' className='rounded-md border-2 border-black p-2 hover:bg-green-500'>Save</button>
          <button type='button' className='rounded-md border-2 border-black p-2 hover:bg-red-500' onClick={onCancel}>Cancel</button>
        </div>
      </form>
    );
};