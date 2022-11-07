import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InputMask from 'react-input-mask';
import { CopyIcon, GoIcon, TrashIcon } from "../components/Icons";

export default function Home() {

  const [cellphone, setCellphone] = useState('');
  const [linkWhatsApp, setLinkWhatsApp] = useState('');

  const handleInputCellphone = async (inputValue: string): Promise<any> => {
    setCellphone(inputValue.replace('(0', '').replace(')', '').replace('-', '').replace(' ', '').replace('_', ''));
    setLinkWhatsApp("https://api.whatsapp.com/send?phone=55" + inputValue.replace('(0', '').replace(')', '').replace('-', '').replace(' ', '').replaceAll('_', ''));
  }

  const clearInputs = () => {
    setCellphone('');
    setLinkWhatsApp('');
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-gradient-to-r from-cyan-100 to-blue-100'>
      <div className="flex flex-col gap-3">
        <h1 className='text-3xl text-indigo-600 text-center font-semibold'>LinkZapp</h1>
        <div className="p-3 border border-solid border-indigo-600 rounded-md bg-white">
          <InputMask mask={cellphone.replaceAll('_', '').length < 11 ? "(099) 9999-9999" : "(099) 99999-9999"} className="text-center outline-none focus:ring-violet-300 w-full" autoComplete="off" type="tel" onInput={(e) => handleInputCellphone((e.target as HTMLInputElement).value)} placeholder="(DDD) 99999-9999" name="cellphone" value={cellphone}></InputMask>
        </div>
          <div className="my-3">
            <div className="flex gap-4 md:gap-2 justify-center">
              <button className="py-3 px-6 md:px-14 rounded-md shadow-md bg-green-600 hover:bg-green-700 cursor-pointer text-white duration-500 disabled:opacity-25" onClick={() => {window.location.href = linkWhatsApp}} disabled={cellphone.replaceAll('_','').length < 10}><GoIcon /></button>
              <CopyToClipboard text={linkWhatsApp} onCopy={() => linkWhatsApp}>
                <button className="py-3 px-6 md:px-14 rounded-md shadow-md bg-blue-600 hover:bg-blue-700 cursor-pointer text-white duration-500 disabled:opacity-25" disabled={cellphone.replaceAll('_','').length < 10}><CopyIcon /></button>
              </CopyToClipboard>
              <button className="py-3 px-6 md:px-14 rounded-md shadow-md bg-red-600 hover:bg-red-700 cursor-pointer text-white duration-500 disabled:opacity-25" onClick={clearInputs} disabled={cellphone.replaceAll('_','').length < 10}>{<TrashIcon />}</button>
            </div>
          </div>
      </div>
    </div>
  )
}
