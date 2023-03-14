package org.hdcd.service;

import java.util.ArrayList;
import java.util.List;

import org.hdcd.domain.Notice;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl implements NoticeService {

	private List<Notice> noticeList = new ArrayList<>();
	
	private int counter = 0;

	@Override
	public void register(Notice notice) throws Exception {
		counter++;
		
		notice.setNoticeNo(counter);
		
		noticeList.add(notice);
	}

	@Override
	public Notice read(Integer noticeNo) throws Exception {
		Notice notice = null;
		for(int i = 0; i < noticeList.size(); i++) {
			Notice tempNotice = noticeList.get(i);
			if(tempNotice.getNoticeNo() == noticeNo) {
				notice = tempNotice;
				break;
			}
		}
		
		return notice;
	}

	@Override
	public void modify(Notice notice) throws Exception {
		Notice tempNotice = null;
		for(int i = 0; i < noticeList.size(); i++) {
			tempNotice = noticeList.get(i);
			if(tempNotice.getNoticeNo() == notice.getNoticeNo()) {
				break;
			}
		}
		
		if(tempNotice != null) {
			tempNotice.setTitle(notice.getTitle());
			tempNotice.setContent(notice.getContent());
		}
	}

	@Override
	public void remove(Integer noticeNo) throws Exception {
		for(int i = 0; i < noticeList.size(); i++) {
			Notice notice = noticeList.get(i);
			
			if(notice.getNoticeNo() == noticeNo) {
				noticeList.remove(i);
				return;
			}
		}
	}

	@Override
	public List<Notice> list() throws Exception {
		return noticeList;
	}
	
}
