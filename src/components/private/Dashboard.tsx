import {
	AssignmentInd,
	AssignmentTurnedIn,
	Face6,
	Quiz,
} from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
	const { countInfo, getInfoDashboard, userInfo } =
		useAuth();
	const {
		countExams,
		countExamsAnswered,
		countExamsAssigned,
		countStudents,
	} = countInfo;

	useEffect(() => {
		getInfoDashboard();
	}, [userInfo]);
	return (
		<div className='dashboard'>
			<div className='containerIcons'>
				<Box>
					<IconButton size='large'>
						<Badge
							showZero
							badgeContent={countExams}
							color='error'>
							<Quiz />
						</Badge>
					</IconButton>
				</Box>
				<Box>
					<IconButton size='large'>
						<Badge
							showZero
							badgeContent={countStudents}
							color='error'>
							<Face6 />
						</Badge>
					</IconButton>
				</Box>
				<Box>
					<IconButton size='large'>
						<Badge
							showZero
							badgeContent={countExamsAssigned}
							color='error'>
							<AssignmentInd />
						</Badge>
					</IconButton>
				</Box>

				<Box>
					<IconButton size='large'>
						<Badge
							showZero
							badgeContent={countExamsAnswered}
							color='error'>
							<AssignmentTurnedIn />
						</Badge>
					</IconButton>
				</Box>
			</div>
		</div>
	);
};

export default Dashboard;
