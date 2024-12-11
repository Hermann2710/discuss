export default function Message() {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10-rounded-full">
                <img src="/vite.svg" alt="user avatar" />
            </div>
        </div>
        <div className={`chat-bubble chat-bubble-primary`}>Hi! Whatsapp?</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  )
}
