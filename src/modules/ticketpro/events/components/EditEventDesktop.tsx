import React from 'react';
import { Paper } from '@material-ui/core';
import { Row, PageContainer } from '../../../common/components/elements';
import EditEventInforForm from './EditEventInforForm';
import back_ground_image from '../../../../assets/background/create_event_background.jpg'
import Footer from '../../../auth/commons/Footer';

interface Props {
    params: undefined;
    onUpdateFilter(params: undefined): void;
    loading?: boolean;
}


const EdiEventDesktop: React.FunctionComponent = () => {


    return (
        <PageContainer style={{ backgroundImage: `url(${back_ground_image})` }}>
            <Row style={{ justifyContent: 'flex-start' }}>
                <Paper
                    elevation={4}
                    style={{
                        display: 'flex',
                        overflow: 'hidden',
                    }}
                >
                    <EditEventInforForm />
                </Paper>
            </Row>
        </PageContainer>
    )
};

export default EdiEventDesktop;
