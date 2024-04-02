import Polygon from '@assets/Polygon.svg';
import WorkspaceCard1 from '@assets/workspace_card1.png';
import WorkspaceCard2 from '@assets/workspace_card2.png';
import WorkspaceCard3 from '@assets/workspace_card3.png';
import WorkspaceCard_Add from '@assets/workspace_add.png';
import mainCard1 from '@assets/maincard1.jpg';
import mainCard2 from '@assets/maincard2.jpg';
import mainCard3 from '@assets/maincard3.jpg';

export const alarm_data =[
    {name: "새로운 캔버스가 작성되었습니다.", date: "오늘 마지막으로 확인됨"},
    {name: "NUWA 사이트를 제작중입니다. 잠시만 기다려주세요", date: "어제 마지막으로 확인됨"}, 
    {name: "새로운 캔버스가 작성되었습니다.", date: "오늘 마지막으로 확인됨"},
    {name: "NUWA 사이트를 제작중입니다. 잠시만 기다려주세요", date: "어제 마지막으로 확인됨"}, 
    {name: "새로운 캔버스가 작성되었습니다.", date: "오늘 마지막으로 확인됨"},
    {name: "NUWA 사이트를 제작중입니다. 잠시만 기다려주세요", date: "어제 마지막으로 확인됨"}, 
    {name: "새로운 캔버스가 작성되었습니다.", date: "오늘 마지막으로 확인됨"},
    {name: "NUWA 사이트를 제작중입니다. 잠시만 기다려주세요", date: "어제 마지막으로 확인됨"}, 
    {name: "새로운 캔버스가 작성되었습니다.", date: "오늘 마지막으로 확인됨"},
    {name: "NUWA 사이트를 제작중입니다. 잠시만 기다려주세요", date: "어제 마지막으로 확인됨"}, 
    {name: "새로운 캔버스가 작성되었습니다.", date: "오늘 마지막으로 확인됨"},
    {name: "NUWA 사이트를 제작중입니다. 잠시만 기다려주세요", date: "어제 마지막으로 확인됨"} 
]

export const canvas_data =[
    {name: "Copy of 캔버스가 무엇인가요?", date: "오늘 마지막으로 확인됨"},
    {name: "NUWA 사이트를 제작중입니다. 잠시만 기다려주세요", date: "어제 마지막으로 확인됨"} 
]

export const categories = [
    {name: "기능", link: '/feat-description' ,icon: Polygon},
    {name: "자주하는 질문", link: "/faq", icon: Polygon}, 
    {name: "도입문의",link: "/inquiry", icon: Polygon},
    {name: "서비스 문의",link: "/helpdesk", icon: Polygon},
    {name: "구독 및 결제",link: '/select-plan', icon: Polygon},
]

export const footer_categories =[
    {
        text1: "NUWA를 위한 서비스",
        text2: "NUWA_Pro 사용해 보기",
        text3: "채널 찾기",
        text4: "신규 채용",
        text5: "서비스 문의",
        text6: "관리자 페이지",

    },

    {
        text1: "인재 찾기",
        text2: "채용 공고",
        text3: "프론트엔드 공고",
        text4: "디자이너 공고",
        text5: "백엔드 공고",
        text6: "기획안 확인하기",

    },

    {
        text1: "NUWA의 정보",
        text2: "앱 다운로드",
        text3: "블로그",
        text4: "도움말 센터",
        text5: "문의",
        text6: "포트폴리오",

    },

    {
        text1: "소셜",
        text2: "Instagram",
        text3: "twitter",
        text4: "Pinterest",
        text5: "Behance",
        text6: "Facebook",

    }
]

export const percent_section = [
    {number: '85', percent: '%', text:'NUWA가 커뮤니케이션을\n개선했다고 답변한 사용자의 비율'},
    {number: '86', percent: '%', text:'원격 근무 능력이\n향상되었음을 느끼는 직원의 비율'},
    {number: '92', percent: '%', text:'팀과 더욱\n연계,소통되고 있음을 느끼는 비율'},
]

export const workspace_section = [
    {title: 'NUWA_PROJECT', image: WorkspaceCard1, number: '13' },
    {title: 'NUWA_PROJECT', image: WorkspaceCard2, number: '15' },
    {title: 'NUWA_PROJECT', image: WorkspaceCard3, number: '17' },
    {title: '워크스페이스 생성', image: WorkspaceCard_Add }
]


export const mainCards = [
    {
      src: mainCard1 ,
      alt: '메인카드1',
      title: '도구들을 한곳에 모아 더 빠르게 업무를 진행하세요',
      description: '생산형 AI의 강력한 기능으로 자리비움 루틴을 자동화하고 자주 사용하는 앱을 Nuwa에서 바로 사용할 수 있도록 워크플로를 간소화합니다',
      detail: 'Slack 플랫폼에 관해 자세히 알아보기 >',
    },
    {
      src: mainCard2 ,
      alt: '메인카드2',
      title: '원하는 업무 방식을 선택하고 사용하세요 ' ,
      description: 'Nuwa는 사용자가 언제,어디서,어떻게 일하든 최적의 환경을 제공하는 유연성을 갖추고 있습니다. 쉽게 채팅하고,오디오나 비디오 클립을 전송하고,또  실시간 논의를 위해 허들에 참여할 수 있습니다' ,
      detail: '간편한 커뮤니케이션에 관해 자세히 알아보기 >',
  
  
    },
    {
      src: mainCard3 ,
      alt: '메인카드3',
      title: '팀을 모두 한곳으로 모아 편하게 관리하세요 ' ,
      description: 'Nuwa의 중심에는 모든인력과 업무에 필요한 모든것을 체계화할 수 있간인 채널이 있습니다. 채널에서는 다른시간대 뿐만 아니라 심지어 다른 회사와의 연결도 더욱 수월해집니다.' ,
      detail: '채널에 관해 자세히 알아보기 >',
  
    }
    
  ];
