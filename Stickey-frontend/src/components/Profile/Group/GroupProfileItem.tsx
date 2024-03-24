import GroupStatus from '../../../assets/image/GroupStatus.png'


export type GroupItem = {
  name: string;
  status: boolean;
  logo: JSX.Element;
}

const GroupProfileItem = () => {
  const dummies : GroupItem[] = [
    {
      name: '삼성',
      status: true,
      logo: <img src="" />
    },
  ]

  return (
    <>
      {dummies.map((item, id) => 
        <div className="flex justify-center" key={id}>
          <div className="flex flex-row gap-3 max-w-[500px] w-full h-[60px] border-none px-6 items-center">
            <div className="w-[56px] h-[56px] rounded-full border border-none bg-Stickey_Gray">
              {item.logo}
            </div>
            <p className="text-[20px] text-white font-semibold">{item.name}</p>
            <div className='w-6'>
              {item.status ? <img src={GroupStatus} /> : '' }
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GroupProfileItem;