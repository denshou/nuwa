import React from 'react';
import { Box, Text, Wrap, Button, Image } from '@chakra-ui/react';
import FileBox from './FileBox';
import { loadMoreFiles, paginateFiles } from './loadMore';
import Plus from '@assets/plus.png';

const renderingFilesByGrid = (
  sortBy,
  fileList,
  currentPage,
  setCurrentPage,
  switchstate,
  checkedUsers,
  filesPerPage,
  filterByUsers
) => {
  const dateList = [];
  for (let i = 0; i < fileList.length; i++) {
    if (!dateList.includes(fileList[i].createdAt.substring(0, 10))) {
      dateList.push(fileList[i].createdAt.substring(0, 10));
    }
  }
  const compareDates = (date1, date2) => {
    return new Date(date2) - new Date(date1);
  };
  dateList.sort(compareDates);

  const filterByDate = (date) => {
    const fbd = fileList.filter((file) => {
      return file.createdAt.substring(0, 10) === date;
    });
    return { date: date, content: fbd };
  };

  function removeLeadingZero(number) {
    return String(number).replace(/^0+/, '');
  }

  function getInitial(text) {
    const doubleConsonants = {
      ㄲ: 'ㄱ',
      ㄸ: 'ㄷ',
      ㅃ: 'ㅂ',
      ㅆ: 'ㅅ',
      ㅉ: 'ㅈ',
    };

    const firstChar = text.charAt(0);
    if (doubleConsonants.hasOwnProperty(firstChar)) {
      return doubleConsonants[firstChar];
    } else {
      const initialList = [
        'ㄱ',
        'ㄲ',
        'ㄴ',
        'ㄷ',
        'ㄸ',
        'ㄹ',
        'ㅁ',
        'ㅂ',
        'ㅃ',
        'ㅅ',
        'ㅆ',
        'ㅇ',
        'ㅈ',
        'ㅉ',
        'ㅊ',
        'ㅋ',
        'ㅌ',
        'ㅍ',
        'ㅎ',
      ];
      const unicode = text.charCodeAt(0);
      if (unicode >= 44032 && unicode <= 55203) {
        // 한글 유니코드 범위
        const initialIndex = Math.floor((unicode - 44032) / 588);
        const initial = initialList[initialIndex];
        if (
          initial === 'ㄲ' ||
          initial === 'ㄸ' ||
          initial === 'ㅃ' ||
          initial === 'ㅆ' ||
          initial === 'ㅉ'
        ) {
          return initialList[initialIndex - 1]; // 단자음으로 변환
        }
        return initial;
      } else {
        return text.charAt(0);
      }
    }
  }

  const initialList = [];
  for (let i = 0; i < fileList.length; i++) {
    if (!initialList.includes(getInitial(fileList[i].fileName).toLowerCase())) {
      initialList.push(getInitial(fileList[i].fileName).toLowerCase());
    }
  }

  initialList.sort();

  const filterByInitial = (initial) => {
    const fbi = fileList.filter((file) => {
      return getInitial(file.fileName).toLowerCase() === initial;
    });
    return { initial: initial, content: fbi };
  };

  const sortedBySize = fileList.slice().sort((a, b) => {
    return b.fileSize - a.fileSize;
  });

  const extensionList = [];
  for (let i = 0; i < fileList.length; i++) {
    if (!extensionList.includes(fileList[i].fileExtension)) {
      extensionList.push(fileList[i].fileExtension);
    }
  }
  extensionList.sort();

  const filterByExtension = (extension) => {
    const fbe = fileList.filter((file) => {
      return file.fileExtension === extension;
    });
    return { extension: extension, content: fbe };
  };

  const renderFiles = (
    files,
    list,
    index,
    currentPage,
    setCurrentPage,
    filesPerPage
  ) => {
    if (!currentPage.length) {
      if (list) setCurrentPage(Array(list.length).fill(0));
      else setCurrentPage([0]);
    }
    const stack = paginateFiles(files, filesPerPage);
    let renderedFiles = [];
    for (let i = 0; i <= currentPage[index]; i++) {
      const pageFiles = stack[i] || [];
      renderedFiles = [...renderedFiles, ...pageFiles];
    }
    return (
      <Wrap spacing="40px">
        {renderedFiles.map((x, index) => {
          console.log(x);
          return (
            <FileBox
              key={index}
              fileName={x.fileName}
              fileMemberUploadName={x.fileMemberUploadName}
              createdAt={x.createdAt}
              fileExtension={x.fileExtension}
              fileSize={x.fileSize}
              fileUrl={x.fileUrl}
            />
          );
        })}
        {currentPage[index] < stack.length - 1 && (
          <Box
            width={'245px'}
            height={'185px'}
            border={'1px solid #d9d9d9'}
            borderRadius={'13px'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'15px'}
            bg={'#ebebeb'}
            cursor={'pointer'}
            _active={{
              transform: 'scale(0.98)', // 클릭 시 약간 축소
            }}
            transition="transform 0.1s ease-in-out" // 변화가 부드럽게 적용되도록 설정
            onClick={() => loadMoreFiles(index, switchstate, setCurrentPage)}
          >
            <Image src={Plus} boxSize={'80px'} />
            <Text fontSize={'16px'} color={'#959595'} fontWeight={'bold'}>
              더보기
            </Text>
          </Box>
        )}
      </Wrap>
    );
  };

  return (
    <>
      {renderFilesBySortType({
        sortBy,
        dateList,
        filterByDate,
        removeLeadingZero,
        filterByUsers,
        initialList,
        filterByInitial,
        checkedUsers,
        fileList,
        sortedBySize,
        extensionList,
        currentPage,
        setCurrentPage,
        filesPerPage,
        switchstate,
        filterByExtension,
        renderFiles,
      })}
    </>
  );
};

const renderFilesBySortType = ({
  sortBy,
  dateList,
  filterByDate,
  removeLeadingZero,
  filterByUsers,
  initialList,
  filterByInitial,
  checkedUsers,
  fileList,
  sortedBySize,
  extensionList,
  currentPage,
  setCurrentPage,
  filesPerPage,
  filterByExtension,
  renderFiles,
}) => {
  switch (sortBy) {
    case 'date':
      const fbdList = [];
      dateList.map((item) => {
        fbdList.push(filterByDate(item));
      });
      for (let i = 0; i < fbdList.length; i++) {
        fbdList[i].content.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
      return dateList.map((item, index) => (
        <Box m="64px 0" key={index}>
          <Text fontSize="22px" fontWeight="500" color="#656565" mb="27px">
            {removeLeadingZero(item.substring(5, 7))}월
            {removeLeadingZero(item.substring(8))}일
          </Text>
          {checkedUsers.length > 0
            ? renderFiles(
                filterByUsers(fbdList[index].content),
                fbdList,
                index,
                currentPage,
                setCurrentPage,
                filesPerPage
              )
            : renderFiles(
                fbdList[index].content,
                fbdList,
                index,
                currentPage,
                setCurrentPage,
                filesPerPage
              )}
        </Box>
      ));
    case 'name':
      const fbiList = [];
      initialList.map((item) => {
        fbiList.push(filterByInitial(item));
      });
      return initialList.map((item, index) => (
        <Box m="64px 0" key={index}>
          <Text fontSize="22px" fontWeight="500" color="#656565" mb="27px">
            {item}
          </Text>
          {checkedUsers.length > 0
            ? renderFiles(
                filterByUsers(fbiList[index].content),
                fbiList,
                index,
                currentPage,
                setCurrentPage,
                filesPerPage
              )
            : renderFiles(
                fbiList[index].content,
                fbiList,
                index,
                currentPage,
                setCurrentPage,
                filesPerPage
              )}
        </Box>
      ));
    case 'size':
      return fileList.length > 0 ? (
        <Box m="64px 0">
          {checkedUsers.length > 0
            ? renderFiles(
                filterByUsers(sortedBySize),
                null,
                0,
                currentPage,
                setCurrentPage,
                filesPerPage
              )
            : renderFiles(
                sortedBySize,
                null,
                0,
                currentPage,
                setCurrentPage,
                filesPerPage
              )}
        </Box>
      ) : null;
    case 'type':
      const fbeList = [];
      extensionList.map((item) => {
        fbeList.push(filterByExtension(item));
      });
      return extensionList.map((item, index) => (
        <Box m="64px 0" key={index}>
          <Text fontSize="22px" fontWeight="500" color="#656565" mb="27px">
            {item}
          </Text>
          {checkedUsers.length > 0
            ? renderFiles(
                filterByUsers(fbeList[index].content),
                fbeList,
                index,
                currentPage,
                setCurrentPage,
                filesPerPage
              )
            : renderFiles(
                fbeList[index].content,
                fbeList,
                index,
                currentPage,
                setCurrentPage,
                filesPerPage
              )}
        </Box>
      ));
    default:
      return null;
  }
};

export default renderingFilesByGrid;
