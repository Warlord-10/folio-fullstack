import ProjectCardList from './ProjectCardList';

async function UserProjectPanel({ userProjectProp }) {
    return (
        <div className='p-6 flex flex-col bg-gradient-to-t from-zinc-950 to-neutral-900 rounded-lg shadow-lg h-full'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Your Projects</h1>
            </div>

            <ProjectCardList projects={userProjectProp}/>
        </div>
    )
}

export default UserProjectPanel