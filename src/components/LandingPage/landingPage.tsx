const landingPage = () => {
  return (
    <div className="">
        <div className="flex justify-center pt-[120px] px-[55px] gap-[40px]">
            <div className="flex flex-col items-center w-[620px] h-48 pr-[90px]">
                <p className="text-[64px] font-bold leading-[96px] xl:text-6xl text-neutral-black-ish">Start your child on a savings journey</p>
                <p className="text-md items-center  text-neutral-black-ish leading-[27px] pt-[20px]">Get your little saver to create goals, save with virtual money, and complete chores to earn money. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quia officia debitis minima deserunt cupiditate magnam sint eos sequi doloribus temporibus, laborum ipsum exercitationem. Quidem, pariatur! Sequi distinctio pariatur aperiam!</p>
            </div>
            <div className="flex justify-center items-center w-[450px] h-[450px]">
                <img src="/Mobile_Mockup.png" alt="Phone" className="self-center" width="282px" height="558px"/>
            </div>
        </div>
        <div className="flex justify-center pt-[120px] px-[55px] gap-[50px]">
            <div className="flex justify-center self-start items-center w-[540px] h-[450px]">
                <img src="/Mobile_Mockup2.png" alt="Phone" width="215px" height="412px"/>
            </div>
            <div className=" pt-[31px]">
                <div>
                    <p className="text-[36px] font-bold text-neutral-black-ish">Our features</p>
                    <p className="pt-[20px] text-neutral-black-ish">How Little Savers will help young children build good savings habits and prepare them for the furture.</p>
                </div>
                <div className="flex">
                    <div className="flex pt-[50px] w-[355px] h-[90px]">
                        <img src="/CircleCheck.svg" alt="dashboard"/>
                        <p className="pl-6 text-[18px]">Create Chores</p>
                    </div>
                    <div className="flex pt-[50px] w-[355px] h-[90px]">
                        <img src="/Piggy.svg" alt="dashboard"/>
                        <p className="pl-6 text-[18px]">Save for goals</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex pt-[50px] w-[355px] h-[90px]">
                        <img src="/Gift.svg" alt="dashboard"/>
                        <p className="pl-6 text-[18px]">Give one-time gifts</p>
                    </div>
                    <div className="flex pt-[50px] w-[355px] h-[90px]">
                        <img src="/Dashboard.svg" alt="dashboard"/>
                        <p className="pl-6 text-[18px]">Dashboard for tracking</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default landingPage