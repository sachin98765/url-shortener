import React from "react"
import { Input } from "@/components/ui/input.jsx"
import { Button } from "@/components/ui/button.jsx"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState()
const Navigate = useNavigate()

  const handleShorten = (e) => {
    e.preventDefault()
    if(longUrl)Navigate(`/auth?createNew=${longUrl}`)
    }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 ">
        <Input
          type="url"
          placeholder="Enter your URL here"
          onChange={(e) => setLongUrl(e.target.value)}
          value={longUrl}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten URL
        </Button>
      </form>
      <img src="/banner.jpg" alt="Banner" className="w-full my-11 md:my-11" />

      <Accordion type="multiple " collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            When you enter a URL and click the "Shorten URL" button, the
            application generates a unique short link that redirects to the
            original URL. This is done by hashing the original URL and storing
            it in a database.
          </AccordionContent>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your shortened URLs,
              view analytics, and access additional features.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geographic location of users, and referral sources for your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage
