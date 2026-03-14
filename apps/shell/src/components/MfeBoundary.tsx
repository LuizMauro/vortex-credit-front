import React from 'react';
import { Button, Card, Heading, Text, tokens } from '@vortex/design-system';

interface Props {
  name: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class MfeBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`[MFE ${this.props.name}]`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
          <Card style={{ textAlign: 'center', maxWidth: 400, padding: 32 }}>
            <Heading as="h3">Módulo indisponível</Heading>
            <Text
              size="sm"
              color={tokens.colors.muted}
              style={{ display: 'block', margin: '8px 0 20px' }}
            >
              O módulo "{this.props.name}" não pôde ser carregado.
            </Text>
            <Button
              variant="secondary"
              onClick={() => this.setState({ hasError: false })}
            >
              Tentar novamente
            </Button>
          </Card>
        </div>
      );
    }
    return this.props.children;
  }
}
