"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useContext, useEffect, useState, useRef } from 'react'

// interface Event {
//   tile: string;
//   start: Date | string;
//   allday: boolean;
//   id: number;
// }
const renderEventContent = (eventInfo, locale) => {
  const { title, start, end, allDay, backgroubdColor } = eventInfo.event;
  const startDate = new Date(start)
  const endDate = new Date(end)


  const isSingleDayEvent = !end || startDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0];

  console.log("------------------------------------------")
  console.log(eventInfo)
  console.log(isSingleDayEvent)
  console.log(allDay)
  console.log("------------------------------------------")

  return (
    <div className="custom-event  text-white">
      <strong className='mr-1'>{title}</strong>
      {/* {!isSingleDayEvent && (
        <p>{startDate.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}-{endDate.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}</p>
      )} */}
      {isSingleDayEvent && !allDay && (
        <p className=''>{start.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: false })}-{end.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: false })} </p>
      )}
    </div>
  );
};

export default function Calender({list}) {
  const locale = "ja"
  const calendarRef = useRef(null);

  const selectDates = (start) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.select(start);
  };

  const [detailList, setDetailList] = useState([])

  const createDate = (date) => {
    let targetDate = date ? new Date(date) : new Date()
    return targetDate.toLocaleString(
      locale,
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
  }
  const createEventDate = (date) => {
    let targetDate = date ? new Date(date) : new Date()
    return targetDate.toLocaleString(
      locale,
        {
          month: "short",
          day: "numeric",
        }
      );
  }
  
  const [current, setCurrent] = useState(createDate())
  const [rowDate, setRowDate] = useState(new Date())

  let resList = []
  let eventList = []
  let dateMap = []
  for(const item of list){
    const entity = new SchaduleEntity(item, locale == "ja")
    const scheduleDict = Object.assign({}, entity);
    resList.push(scheduleDict)

    const key = `${scheduleDict.year}-${String(scheduleDict.month).padStart(2, '0')}-${String(scheduleDict.day).padStart(2, '0')}`;

    if (!dateMap[key]) {
      dateMap[key] = []; // キーが存在しない場合、空の配列を作成
    }
    dateMap[key].push(scheduleDict); 

    if(scheduleDict.isEvent && isWithinSchoolYear(scheduleDict.dateTime)){
      eventList.push(scheduleDict)
    }
  }
  eventList = eventList.sort((a, b) => new Date(a.start) - new Date(b.start));

  const [allEvents, setAllEvents] = useState(resList)
  const [map, setMap] = useState(dateMap)


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const selectDate = (dateStr) => {
    setRowDate(dateStr)
    let items = map[dateStr]
    if(items && items.length > 0){
      setDetailList(items)
      openModal()
    } else {
      setDetailList([])
    }
  }

  const selectEvent = (info) => {
    const dateStr = info.event.extendedProps.startStr
    setRowDate(dateStr)
    setDetailList([info.event])
    openModal()
  }


  useEffect(() => {
    selectDates(new Date(rowDate))
    setCurrent(createDate(rowDate))
    setAllEvents(resList)
  }, [rowDate, locale]);
  
  return (
    <>
      
      <section >
          <div className="flex-1">
            <FullCalendar 
              ref={calendarRef}
              locale={locale}
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              headerToolbar={{
                left: 'prev, next',
                center: 'title',
                right: 'today, dayGridMonth, timeGridWeek'
              }}
              events={allEvents}
              nowIndicator={true}
              selectable={true}
              dateClick={(info) => {selectDate(info.dateStr)}}
              eventClick={(info) => selectEvent(info)}
              displayEventEnd={true}
              dayCellContent={(arg) => { return arg.date.getDate(); }}
              dayGridMonth={{titleFormat: { month: "long" }}}
              initialDate={rowDate}
              eventContent={(info) => renderEventContent(info, locale)}
              timeGridWeek={{titleFormat: function(date){
                if(locale == "en"){
                  return { month: "long" }
                }
                const startMonth = date.start.month + 1;
                const endMonth = date.end.month + 1;
          
                // 1週間のうちに月をまたぐかどうかの分岐処理
                if (startMonth === endMonth) {
                   return startMonth + '月';
                } else {
                   return startMonth + '月～' + endMonth + '月'; 
                }
              }}}
              className={`bg-secondary-light dark:bg-primary-dark text-secondary-light dark:text-primary-dark`}
            />
          </div>
      </section>
      
    </>
  );
}
