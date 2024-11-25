import { RxStarFilled } from "react-icons/rx";

interface StarProps {
  tailwind_text_size?: string; // Ubah ke optional
  padding?: number;            // Ubah ke optional
  filled?: boolean;            // Ubah ke optional
}

function ReviewStar({ tailwind_text_size = 'text-sm', padding = 3, filled=true }: StarProps) {
  return (
    <div className={`flex items-center justify-center p-${padding} ${filled? 'bg-teal-500' : 'bg-gray-500 '} text-white rounded-full text-lg font-bold`}>
      <RxStarFilled className={tailwind_text_size} />
    </div>
  ) 
}

export default ReviewStar