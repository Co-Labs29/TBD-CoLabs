import Navbar from '../components/Navbar'
import Calender from "../components/Calender/Calender.jsx"

const LandingPage = () => {
  return (
    <div className='h-screen'>
    <Navbar />
    <div className="">
      <div className="flex flex-col md:justify-center md:pt-[120px] md:px-[55px] md:gap-[100px] bg-landing-background md:flex-row w-full h-full">
        <div className="flex flex-col items-center md:w-[850px] md:pt-[47px] w-full pt-[30px] px-[30px]">
          <p className="md:text-[64px] text-[28px] text-center leading-[42px] font-bold md:leading-[96px] text-neutral-black-ish w-full md:w-[650px]">
            Start your child on a savings journey
          </p>
          <p className="text-md items-center text-neutral-black-ish leading-[27px] pt-[20px] pb-[50px] text-center w-full md:w-auto">
            Get your little saver to create goals, save with virtual money, and
            complete chores to earn money.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/Mobile_Mockup.png"
            alt="Phone"
            className="w-[208px] h-[294px] md:h-[421px] md:w-[350px]"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:py-[120px] md:px-[55px] px-[30px] gap-[50px] w-full" id='signup'>
  <div className="pt-[60px] md:max-w-[570px] flex flex-col flex-grow ">
    <div className="flex flex-col">
      <p className="text-[36px] font-bold text-neutral-black-ish">Our features</p>
      <p className="pt-[20px] text-neutral-black-ish">How Little Savers will help young children build good savings habits and prepare them for the future.</p>
    </div>
    <div className="flex flex-wrap">
      <div className="flex flex-wrap md:basis-1/2 w-full md:w-[355px] h-[90px] pt-[50px]">
        <img src="/CircleCheck.svg" alt="dashboard" className="w-8 h-8" />
        <p className="pl-6 text-[18px]">Create Chores</p>
      </div>
      <div className="flex  md:basis-1/2 w-full md:w-[355px] h-[90px] pt-[50px]">
        <img src="/Piggy.svg" alt="dashboard" className="w-8 h-8" />
        <p className="pl-6 text-[18px]">Save for goals</p>
      </div>
      <div className="flex flex-wrap md:basis-1/2 w-full md:w-[355px] h-[90px] pt-[50px]">
        <img src="/Gift.svg" alt="dashboard" className="w-8 h-8" />
        <p className="pl-6 text-[18px]">Give one-time gifts</p>
      </div>
      <div className="flex flex-wrap md:basis-1/2 w-full md:w-[355px] h-[90px] pt-[50px]">
        <img src="/Dashboard.svg" alt="dashboard" className="w-8 h-8" />
        <p className="pl-6 text-[18px]">Dashboard for tracking</p>
      </div>
    </div>
  </div>
  <div className="w-full md:w-[540px] h-[450px] flex justify-center order-last md:order-first">
    <img src="/Mobile_Mockup2.png" alt="Phone" className="min-h-[412px] min-w-[215px]" />
  </div>
</div>

    </div>
    <Calender />
    </div>
  );
};

export default LandingPage;
